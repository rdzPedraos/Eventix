import React, { useMemo } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import CurrentMoment from "./CurrentMoment";
import Grid from "./Grid";

import { Day, getWeekDays, hours, now } from "../utils";
import { useCalendarContext } from "../context";

type Props = {};

export default function Week({}: Props) {
    const { day, setDay, events } = useCalendarContext();
    const week = useMemo(() => day.startOf("week"), [day]);
    const weekDays = useMemo(() => getWeekDays(week), [week]);

    const today = now();
    const goToToday = () => setDay(today);

    const changeWeek = (direction: "left" | "right") => {
        const add = direction === "left" ? -1 : 1;
        setDay((day: Day) => day.add(add, "week"));
    };

    return (
        <div className="h-full w-full bg-white flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={goToToday}>
                        Hoy
                    </Button>
                    <div className="flex">
                        <Button
                            variant="light"
                            onClick={() => changeWeek("left")}
                            size="sm"
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => changeWeek("right")}
                            size="sm"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <h2 className="text-xl font-semibold">
                        {week.format("MMMM YYYY")}
                    </h2>
                </div>
                {/*<Button onClick={() => setModalCrearAbierto(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Crear
                </Button>*/}
            </div>

            {/* Calendario */}
            <div className="flex-grow flex flex-col overflow-hidden border border-gray-200 rounded-lg">
                {/* Dias */}
                <div
                    className="grid grid-cols-[auto_1fr] border-b border-gray-200 pr-2 shadow"
                    /*style={{ paddingRight: `${scrollbarWidth}px` }}*/
                >
                    <div className="bg-white p-2 border-r border-gray-200 w-16"></div>
                    <div className="grid grid-cols-7">
                        {weekDays.map((day) => {
                            const currentDay = day.isSame(today, "day");
                            return (
                                <div
                                    key={day.toString()}
                                    className={`bg-white p-2 text-center border-r border-gray-200 ${currentDay ? "bg-blue-50" : ""}`}
                                >
                                    <div className="font-medium">
                                        {day.format("dddd")}
                                    </div>
                                    <div
                                        className={`text-xl ${currentDay ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                                    >
                                        {day.format("D")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Calendario */}
                <div
                    /*ref={scrollContainerRef}*/
                    className="flex-grow overflow-y-auto custom-scrollbar"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(203, 213, 225, 0.7) transparent",
                    }}
                >
                    <div className="relative grid grid-cols-[auto_1fr]">
                        <div className="bg-white sticky left-0 z-20 border-r border-gray-200 w-16">
                            {hours.map((hour) => (
                                <div
                                    key={hour.toString()}
                                    className="h-16 relative"
                                >
                                    <span className="absolute -top-3 w-full px-2 py-2 text-center text-xs text-gray-500 bg-white">
                                        {hour.format("HH:mm")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {weekDays.map((day) => (
                                <Grid
                                    key={day.toString()}
                                    day={day}
                                    events={events}
                                />
                            ))}
                        </div>

                        {/* Línea roja de hora actual */}
                        {week.isSame(today, "week") && (
                            <CurrentMoment week={week} />
                        )}
                    </div>
                </div>
            </div>

            {/*<Dialog
                open={!!eventoSeleccionado}
                onOpenChange={() => setEventoSeleccionado(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{eventoSeleccionado?.titulo}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {eventoSeleccionado?.fecha.toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Hora:</strong>{" "}
                            {eventoSeleccionado?.fecha.toLocaleTimeString()} -{" "}
                            {eventoSeleccionado?.fechaFin.toLocaleTimeString()}
                        </p>
                        <p>
                            <strong>Descripción:</strong>{" "}
                            {eventoSeleccionado?.descripcion}
                        </p>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            <Dialog
                open={modalCrearAbierto}
                onOpenChange={setModalCrearAbierto}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Evento</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="titulo" className="text-right">
                                Título
                            </Label>
                            <Input
                                id="titulo"
                                value={nuevoEvento.titulo}
                                onChange={(e) =>
                                    setNuevoEvento({
                                        ...nuevoEvento,
                                        titulo: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fecha" className="text-right">
                                Fecha
                            </Label>
                            <Input
                                id="fecha"
                                type="date"
                                value={nuevoEvento.fecha}
                                onChange={(e) =>
                                    setNuevoEvento({
                                        ...nuevoEvento,
                                        fecha: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="horaInicio" className="text-right">
                                Hora de inicio
                            </Label>
                            <Input
                                id="horaInicio"
                                type="time"
                                value={nuevoEvento.horaInicio}
                                onChange={(e) =>
                                    handleHoraChange(
                                        "horaInicio",
                                        e.target.value
                                    )
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="horaFin" className="text-right">
                                Hora de finalización
                            </Label>
                            <Input
                                id="horaFin"
                                type="time"
                                value={nuevoEvento.horaFin}
                                onChange={(e) =>
                                    handleHoraChange("horaFin", e.target.value)
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="descripcion" className="text-right">
                                Descripción
                            </Label>
                            <Input
                                id="descripcion"
                                value={nuevoEvento.descripcion}
                                onChange={(e) =>
                                    setNuevoEvento({
                                        ...nuevoEvento,
                                        descripcion: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogDescription>
                        <Button onClick={crearEvento}>Crear Evento</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>*/}
        </div>
    );
}
