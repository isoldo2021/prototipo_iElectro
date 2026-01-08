"use client";

import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Check, X } from "lucide-react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";

const availabilityData = [
    { time: "10:00 - 14:00", days: [false, false, true, true, false, true, true] },
    { time: "14:00 - 18:00", days: [false, true, true, true, false, true, true] },
    { time: "18:00 - 21:00", days: [false, false, true, true, false, true, true] },
];

const today = new Date();
const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

export function DeliveryAvailabilityView() {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]"></TableHead>
                                {days.map((day, index) => (
                                    <TableHead key={index} className="text-center">
                                        <div className="capitalize font-bold">{format(day, "EEE", { locale: es })}</div>
                                        <div className="text-xs text-muted-foreground">{format(day, "d MMM", { locale: es })}</div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {availabilityData.map((row, rowIndex) => (
                                <TableRow key={rowIndex} className={rowIndex === 1 ? "bg-muted/50" : ""}>
                                    <TableCell className="font-semibold">{row.time}</TableCell>
                                    {row.days.map((isAvailable, dayIndex) => (
                                        <TableCell key={dayIndex} className="text-center">
                                            {isAvailable ? (
                                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="h-5 w-5 text-red-500 mx-auto" />
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
