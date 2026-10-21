
"use client";

import { useAuth } from "@/context/AuthContext2";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type AuthType = {
    id: number;
    FirstName?: string;
    LastName?: string;
    email: string;
    age: number;
    phone?: string;
    role: string;
    password: string;
};

type Acctype = {
    id: number;
    type: string;
    unitNumber: number;
    floorNumber: number;
    maxGuests: number;
    pricePerNight: number;
    Booked: boolean;
};

function getToday(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getNextDay(dateString: string): string {
    const date = new Date(`${dateString}T12:00:00`);
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function BookingPage() {
    const { user } = useAuth();
    const params = useSearchParams();
    const id = params.get("id");

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [accData, setAccData] = useState<Acctype>();
    const [user1, setUser1] = useState<AuthType | null>(user ?? null);

    const [available, setAvailable] = useState<boolean | null>(null);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [bookingSucceeded, setBookingSucceeded] = useState(false);

   

    const nights =
        checkIn && checkOut
            ? Math.round(
                  (new Date(`${checkOut}T12:00:00`).getTime() -
                      new Date(`${checkIn}T12:00:00`).getTime()) /
                      86400000
              )
            : 0;

    const validDates = nights >= 1 && nights <= 7;

    // Fetch accommodation details.
    useEffect(() => {
        if (!id) {
           
            return;
        }

        const controller = new AbortController();

        async function getAccommodation() {
            try {
                const response = await fetch(
                    `http://localhost:8080/Backend/getAccommodation?id=${encodeURIComponent(id!)}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch accommodation: HTTP ${response.status}`
                    );
                }

                const data: Acctype = await response.json();

                if (!controller.signal.aborted) {
                    setAccData(data);
                }
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                if (!controller.signal.aborted) {
                    console.error("Accommodation fetch failed:", error);
                    setMessage("Unable to load accommodation details.");
                }
            }
        }

        void getAccommodation();

        return () => controller.abort();
    }, [id]);

    // Check availability whenever the dates change.
    useEffect(() => {
        if (!id || !checkIn || !checkOut || checkOut <= checkIn) {
         
            return;
        }

        const controller = new AbortController();

        async function checkAvailability() {
            setCheckingAvailability(true);
            setAvailable(null);

            try {
                const response = await fetch(
                    `http://localhost:8080/Backend/checkAvailability?id=${encodeURIComponent(id!)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
                    {
                        method: "GET",
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();

                    throw new Error(
                        `Availability API error: HTTP ${response.status} ${errorText}`
                    );
                }

                const result: unknown = await response.json();

                if (typeof result !== "boolean") {
                    throw new Error("Invalid availability response");
                }

                if (controller.signal.aborted) return;

                setAvailable(result);
                setMessage(
                    result
                        ? ""
                        : "Sorry, this accommodation is already booked for these dates."
                );
            } catch (error) {
                if (
                    controller.signal.aborted ||
                    (error instanceof Error &&
                        error.name === "AbortError")
                ) {
                    return;
                }

                console.error("Availability check failed:", error);
                setAvailable(null);
                setMessage(
                    "Unable to check availability. Please try again."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setCheckingAvailability(false);
                }
            }
        }

        void checkAvailability();

        return () => controller.abort();
    }, [id, checkIn, checkOut]);

    // Update guest information.
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value, name } = event.target;

        setUser1((previous) => {
            if (!previous) return previous;

            return {
                ...previous,
                [name]: name === "age" ? Number(value) : value,
            };
        });
    };

    // Save edited guest details.
    const saveUserData = async () => {
        if (!user1) {
            throw new Error("Please log in before continuing.");
        }

        const response = await fetch(
            "http://localhost:8080/Backend/UpdateorNew",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user1),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                `User details could not be saved: HTTP ${response.status} ${errorText}`
            );
        }
    };

    // Submit booking.
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (submitting) return;

        setBookingSucceeded(false);

        if (!user1) {
            setMessage("Please log in before continuing.");
            return;
        }

        if (!id || !accData || !Number.isFinite(Number(id))) {
            setMessage("Accommodation details are missing or invalid.");
            return;
        }

        if (!validDates || checkIn < getToday()) {
            setMessage(
                "Please select valid dates for a stay between 1 and 7 nights."
            );
            return;
        }

        if (checkingAvailability || available !== true) {
            setMessage("Please wait until availability is confirmed.");
            return;
        }

        if (
            !Number.isInteger(guestCount) ||
            guestCount < 1 ||
            guestCount > accData.maxGuests
        ) {
            setMessage("Please enter a valid number of guests.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            // Save edited guest details first.
            await saveUserData();

            // Prepare the booking request.
            const booking = {
                userId: user1.id,
                accommodationUnitId: Number(id),
                checkInDate: checkIn,
                checkOutDate: checkOut,
                guestCount: guestCount,
            };

            console.log("Sending booking request:", booking);

            // Call the backend booking API.
            const bookingResponse = await fetch(
                "http://localhost:8080/Backend/createBooking",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(booking),
                }
            );

            // Your current backend returns String, not JSON.
            const responseText = await bookingResponse.text();

            console.log("Booking API status:", bookingResponse.status);
            console.log("Booking API response:", responseText);

            if (!bookingResponse.ok) {
                throw new Error(
                    `Booking failed: HTTP ${bookingResponse.status} ${responseText}`
                );
            }

            setBookingSucceeded(true);
            setMessage(responseText || "Booking created successfully!");
        } catch (error) {
            console.error("Booking submission failed:", error);

            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to create booking. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const isError =
        !bookingSucceeded &&
        (
            available === false ||
            message.toLowerCase().includes("unable") ||
            message.toLowerCase().includes("failed") ||
            message.toLowerCase().includes("could not") ||
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("missing") ||
            message.toLowerCase().includes("invalid") ||
            message.toLowerCase().includes("not found") ||
            message.toLowerCase().includes("http ")
        );

    return (
        <main className="min-h-screen bg-emerald-50 px-4 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
                <h1 className="text-3xl font-bold text-emerald-950">
                    Book Your Stay
                </h1>

                <p className="mt-2 text-gray-600">
                    Complete your details to reserve Sunshine Villa.
                </p>

                {!id && (
                    <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
                        Accommodation ID is missing.
                    </p>
                )}

                {message && (
                    <p
                        role="status"
                        aria-live="polite"
                        className={`mt-5 rounded-lg p-3 ${
                            isError
                                ? "bg-red-50 text-red-700"
                                : "bg-emerald-50 text-emerald-900"
                        }`}
                    >
                        {message}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-8"
                >
                    <section className="rounded-2xl border border-emerald-100 p-5 sm:p-6">
                        <h2 className="mb-5 text-xl font-semibold text-emerald-900">
                            Guest Information
                        </h2>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <label className="text-sm font-medium text-emerald-900">
                                First Name
                                <input
                                    name="FirstName"
                                    value={user1?.FirstName ?? ""}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="mt-2 w-full rounded-lg border border-emerald-200 bg-gray-50 p-2.5"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900">
                                Last Name
                                <input
                                    name="LastName"
                                    value={user1?.LastName ?? ""}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="mt-2 w-full rounded-lg border border-emerald-200 bg-gray-50 p-2.5"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900">
                                Email
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={user1?.email ?? ""}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full rounded-lg border border-emerald-200 bg-gray-50 p-2.5"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900">
                                Age
                                <input
                                    name="age"
                                    type="number"
                                    min={1}
                                    required
                                    value={user1?.age ?? ""}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full rounded-lg border border-emerald-200 bg-gray-50 p-2.5"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900">
                                Phone
                                <input
                                    name="phone"
                                    type="tel"
                                    value={user1?.phone ?? ""}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full rounded-lg border border-emerald-200 bg-gray-50 p-2.5"
                                />
                            </label>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-emerald-100 p-5 sm:p-6">
                        <h2 className="mb-5 text-xl font-semibold text-emerald-900">
                            Booking Details
                        </h2>

                        <h3 className="mb-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                            Accommodation:{" "}
                            {accData
                                ? `${accData.type}, Unit ${accData.unitNumber}, Floor ${accData.floorNumber}`
                                : "Loading accommodation..."}
                        </h3>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <label className="text-sm font-medium text-emerald-900">
                                Check-in
                                <input
                                    type="date"
                                    required
                                    min={getToday()}
                                    value={checkIn}
                                    onChange={(event) => {
                                        const nextCheckIn =
                                            event.target.value;

                                        setCheckIn(nextCheckIn);

                                        if (
                                            checkOut &&
                                            checkOut <= nextCheckIn
                                        ) {
                                            setCheckOut("");
                                        }

                                        setAvailable(null);
                                        setBookingSucceeded(false);
                                    }}
                                    className="mt-2 w-full rounded-lg border border-emerald-200 p-2.5"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900">
                                Check-out
                                <input
                                    type="date"
                                    required
                                    disabled={!checkIn}
                                    min={
                                        checkIn
                                            ? getNextDay(checkIn)
                                            : undefined
                                    }
                                    value={checkOut}
                                    onChange={(event) => {
                                        setCheckOut(event.target.value);
                                        setAvailable(null);
                                        setBookingSucceeded(false);
                                    }}
                                    className="mt-2 w-full rounded-lg border border-emerald-200 p-2.5 disabled:bg-gray-100"
                                />
                            </label>

                            <label className="text-sm font-medium text-emerald-900 sm:col-span-2">
                                Number of Guests
                                <input
                                    type="number"
                                    min={1}
                                    max={accData?.maxGuests ?? 10}
                                    required
                                    value={guestCount}
                                    onChange={(event) =>
                                        setGuestCount(
                                            Number(event.target.value)
                                        )
                                    }
                                    className="mt-2 w-full rounded-lg border border-emerald-200 p-2.5 sm:max-w-xs"
                                />
                            </label>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            You can book between 1 and 7 nights per
                            reservation.
                        </p>

                        {checkIn && checkOut && checkOut > checkIn && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="mt-4 rounded-lg p-3 text-sm"
                            >
                                {checkingAvailability ? (
                                    <p className="text-gray-600">
                                        Checking availability...
                                    </p>
                                ) : available === true ? (
                                    <p className="font-medium text-emerald-700">
                                        ✓ This accommodation is available
                                        for your selected dates.
                                    </p>
                                ) : available === false ? (
                                    <p className="font-medium text-red-600">
                                        ✕ This accommodation is unavailable
                                        for your selected dates.
                                    </p>
                                ) : (
                                    <p className="text-gray-600">
                                        Availability has not been confirmed.
                                    </p>
                                )}
                            </div>
                        )}
                    </section>

                    <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
                        <h2 className="text-xl font-semibold text-emerald-950">
                            Price Summary
                        </h2>

                        <div className="mt-4 flex justify-between gap-4 text-emerald-900">
                            <span>Price per night</span>
                            <span>
                                {accData
                                    ? `₹${accData.pricePerNight.toLocaleString("en-IN")}`
                                    : "Loading..."}
                            </span>
                        </div>

                        <div className="mt-3 flex justify-between text-emerald-900">
                            <span>Number of nights</span>
                            <span>{validDates ? nights : "—"}</span>
                        </div>

                        <div className="mt-4 flex justify-between border-t border-emerald-200 pt-4 text-lg font-bold text-emerald-950">
                            <span>Estimated Total</span>
                            <span>
                                {accData && validDates
                                    ? `₹${(
                                          accData.pricePerNight * nights
                                      ).toLocaleString("en-IN")}`
                                    : "—"}
                            </span>
                        </div>
                    </section>

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            !user1 ||
                            !accData ||
                            !validDates ||
                            checkingAvailability ||
                            available !== true ||
                            guestCount < 1 ||
                            guestCount > (accData?.maxGuests ?? 10)
                        }
                        className="w-full rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {submitting
                            ? "Processing..."
                            : checkingAvailability
                              ? "Checking Availability..."
                              : available === true
                                ? "Confirm Booking"
                                : "Select Available Dates"}
                    </button>
                </form>
            </div>
        </main>
    );
}
