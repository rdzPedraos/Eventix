import React, { useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { CurrentMoment, Grid } from "./";

type Props = {};

const diasSemana = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
);
const colors = [
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-purple-100 border-purple-300",
    "bg-red-100 border-red-300",
    "bg-yellow-100 border-yellow-300",
];

const getRandomEvents = (week: Date) => {
    const events = Array(40)
        .fill(null)
        .map((_, i) => {
            const day = Math.floor(Math.random() * 7);
            const hour = Math.floor(Math.random() * 23);
            const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, or 45 minutes
            const duration = Math.floor(Math.random() * 12) + 1; // 1 to 12 quartiles (15 min to 3 hours)

            const color = colors[Math.floor(Math.random() * colors.length)];

            const title = `Evento ${i + 1}`;
            const description = `Descripción del evento ${i + 1}`;

            const startDate = new Date(week);
            startDate.setDate(startDate.getDate() + day);
            startDate.setHours(hour, minute, 0, 0);

            const endDate = new Date(startDate);
            endDate.setMinutes(endDate.getMinutes() + duration * 15);

            //avoid endate to be in the next day
            if (endDate.getDate() !== startDate.getDate()) {
                endDate.setDate(endDate.getDate() - 1);
                endDate.setHours(23, 59, 59, 999);
            }

            return {
                id: i.toString(),
                startDate,
                endDate,
                title,
                color,
                description,
            };
        });

    return events;
};

export default function Week({}: Props) {
    const [week, setWeek] = useState(() => {
        const today = new Date();
        const firstDay = new Date(
            today.setDate(today.getDate() - today.getDay())
        );

        return firstDay;
    });

    const events = useMemo(() => getRandomEvents(week), [week]);

    const changeWeek = (direccion: number) => {
        setWeek((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + direccion * 7);
            return newDate;
        });
    };

    const goToToday = () => {
        const today = new Date();
        const firstDay = new Date(
            today.setDate(today.getDate() - today.getDay())
        );

        setWeek(firstDay);
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
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
                            onClick={() => changeWeek(-1)}
                            size="sm"
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => changeWeek(1)}
                            size="sm"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <h2 className="text-xl font-semibold">
                        {week.toLocaleDateString("es-ES", {
                            month: "long",
                            year: "numeric",
                        })}
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
                        {diasSemana.map((dia, index) => {
                            const fecha = new Date(week);
                            fecha.setDate(week.getDate() + index);
                            const currentDay = isToday(fecha);

                            return (
                                <div
                                    key={dia}
                                    className={`bg-white p-2 text-center border-r border-gray-200 ${currentDay ? "bg-blue-50" : ""}`}
                                >
                                    <div className="font-medium">{dia}</div>
                                    <div
                                        className={`text-xl ${currentDay ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                                    >
                                        {fecha.getDate()}
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
                            {horas.map((hora) => (
                                <div key={hora} className="h-16 relative">
                                    <span className="absolute -top-3 w-full px-2 py-2 text-center text-xs text-gray-500 bg-white">
                                        {hora === "00" ? "" : `${hora}:00`}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {diasSemana.map((_, diaIndex) => (
                                <Grid
                                    key={diaIndex}
                                    day={
                                        new Date(
                                            week.getFullYear(),
                                            week.getMonth(),
                                            week.getDate() + diaIndex
                                        )
                                    }
                                    events={events}
                                />
                            ))}
                        </div>

                        {/* Línea roja de hora actual */}
                        {(isToday(
                            new Date(
                                week.getFullYear(),
                                week.getMonth(),
                                week.getDate()
                            )
                        ) ||
                            true) && <CurrentMoment week={week} />}
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
