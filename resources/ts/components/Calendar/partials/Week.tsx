import React, { useMemo } from "react";

import { useCalendarContext } from "../context";
import { getWeekDays, now } from "../utils";

import Grid from "./Grid";
import Header from "./Header";
import CurrentMoment from "./CurrentMoment";
import Hours from "./Hours";

type Props = {};

export default function Week({}: Props) {
    const { day, events } = useCalendarContext();
    const week = useMemo(() => day.startOf("week"), [day]);
    const weekDays = useMemo(() => getWeekDays(week), [week]);

    const today = now();

    return (
        <div className="h-full w-full bg-white flex flex-col">
            <Header />

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
                        <Hours />

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
