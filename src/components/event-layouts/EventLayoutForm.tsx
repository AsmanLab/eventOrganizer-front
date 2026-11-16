"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { clamp } from "@/components/lib/utils";

import StandForm, { StandFormData } from "./StandForm";
import StandComponent from "@/components/event-layouts/StandComponent";
import EventSpotStatusBar from "@/components/event-layouts/EventSpotStatusBar";

import {
  TEventLayoutDto,
  TSpotStatus,
  TStand,
} from "shared/types/event-layout";
import {
  useUpdateEventLayout,
  useUpdateEventLayoutBgImg,
} from "api/event-layouts/queries";
import EventlayoutSettingsForm from "./EventLayouSettingsForm";
import SpotModal from "@/components/event-layouts/SpotModal";
import {
  eventLayoutSchema,
  TEventLayoutFormData,
} from "@/schemas/stand-schema";

interface EventLayoutFormProps {
  initialData: TEventLayoutDto;
  isAdmin: boolean;
}

const EventLayoutForm: React.FC<EventLayoutFormProps> = ({
  initialData,
  isAdmin = false,
}) => {
  const methods = useForm<TEventLayoutFormData>({
    resolver: zodResolver(eventLayoutSchema),
    defaultValues: {
      id: 0,
      width: 500,
      height: 500,
      bgImage: undefined,
      stands: [],
    },
  });
  const { handleSubmit, setValue, getValues, watch, reset } = methods;

  const { width, height, stands } = watch();
  const [bgPreview, setBgPreview] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Drag & Resize State ---
  const [draggingElement, setDraggingElement] = useState<TStand | null>(null);
  const [resizingElement, setResizingElement] = useState<TStand | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const draggedRef = useRef(false);
  const [nextTempId, setNextTempId] = useState(-1);
  const [selectedSpot, setSelectedSpot] = useState<TStand | null>(null);

  useEffect(() => {
    if (initialData) {
      reset({
        id: initialData.id,
        width: initialData.width,
        height: initialData.height,
        //bgImage: null, // We don't pre-set the file; we only use its URL for preview.
        stands: initialData.stands || [],
      });
      setBgPreview(initialData.bg_image || null);
    }
  }, [initialData, reset]);

  const handleMouseDownOnElement = (
    e: React.MouseEvent<HTMLDivElement>,
    stand: TStand,
    isResizeHandle = false
  ) => {
    e.stopPropagation();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    draggedRef.current = false;
    if (isResizeHandle) {
      setResizingElement(stand);
      setIsResizing(true);
    } else {
      setDraggingElement(stand);
      setOffset({ x: x - stand.x, y: y - stand.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    if (draggingElement && !isResizing) {
      const newX = clamp(x - offset.x, 0, width - draggingElement.width);
      const newY = clamp(y - offset.y, 0, height - draggingElement.height);
      if (
        Math.abs(newX - draggingElement.x) > 5 ||
        Math.abs(newY - draggingElement.y) > 5
      ) {
        draggedRef.current = true;
      }
      updateStandPosition(draggingElement.id, newX, newY);
    }
    if (resizingElement && isResizing) {
      const newWidth = clamp(
        x - resizingElement.x,
        20,
        width - resizingElement.x
      );
      const newHeight = clamp(
        y - resizingElement.y,
        20,
        height - resizingElement.y
      );
      draggedRef.current = true;
      updateStandSize(resizingElement.id, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setDraggingElement(null);
    setResizingElement(null);
    setIsResizing(false);
    setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  const updateStandPosition = (id: number, newX: number, newY: number) => {
    const currentStands = getValues("stands");
    const updatedStands = currentStands.map((s: TStand) =>
      s.id === id ? { ...s, x: newX, y: newY } : s
    );
    setValue("stands", updatedStands);
  };

  const updateStandSize = (id: number, newWidth: number, newHeight: number) => {
    const currentStands = getValues("stands");
    const updatedStands = currentStands.map((s: TStand) =>
      s.id === id
        ? {
            ...s,
            width: Math.round(newWidth),
            height: Math.round(newHeight),
          }
        : s
    );
    setValue("stands", updatedStands);
  };
  // --- End Drag & Resize Handlers ---

  // Handler for background image selection.
  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("bgImage", file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  // Handler to add a new stand from the StandForm.
  const addStand = (standData: StandFormData) => {
    const newStand: TStand = {
      ...standData,
      id: nextTempId, // Assign temporary ID
    };
    setNextTempId((prev) => prev - 1);
    const currentStands = getValues("stands");
    setValue("stands", [...currentStands, newStand]);
  };

  const { mutate: updateLayout, isPending: isSaving } = useUpdateEventLayout();
  const { mutate: updateBgImg, isPending: isUpdatingBgImg } =
    useUpdateEventLayoutBgImg();

  const onSubmit = (data: TEventLayoutFormData) => {
    updateLayout({
      updatedData: {
        ...data,
        festival: initialData.festival,
      },
    });
  };

  const handleBgImageUpdate = () => {
    const bgImageFile = getValues("bgImage");
    if (!bgImageFile) return;
    const formData = new FormData();
    formData.append("festival", String(initialData.festival));
    formData.append("bg_image", bgImageFile);
    return updateBgImg(formData);
  };

  const handleCloseModal = () => setSelectedSpot(null);

  const handleDeleteSpot = (id: number) => {
    setValue(
      "stands",
      getValues("stands")?.filter((stand) => stand.id !== id)
    );
    setSelectedSpot(null);
  };

  const handleUpdateSpotStatus = (id: number, status: TSpotStatus) => {
    setValue(
      "stands",
      getValues("stands")?.map((item) => {
        if (item.id === id) {
          return { ...item, status: status };
        }
        return item;
      })
    );
    setSelectedSpot(null);
  };

  return (
    <FormProvider {...methods}>
      {/* Single top-level form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Планировка стендов мероприятия «{initialData.festival_title}»
        </h1>

        <div className="w-full flex flex-wrap gap-4 justify-between items-center">
          <EventSpotStatusBar isAdmin={isAdmin} />
          {isAdmin && (
            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Сохранение..." : "Сохранить макет"}
              </Button>
              <Button
                type="button"
                onClick={handleBgImageUpdate}
                disabled={isUpdatingBgImg}
              >
                {isUpdatingBgImg ? "Обновление..." : "Обновить фон"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap flex-col md:flex-row gap-4">
          {/* Canvas / Layout Display */}
          <div className="flex-1">
            <div
              ref={containerRef}
              className="relative mb-4 border border-dashed border-main-red rounded overflow-hidden bg-[#F5F7FB]"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: bgPreview ? `url(${bgPreview})` : undefined,
                backgroundSize: "cover",
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {stands.map((stand: TStand) => (
                <StandComponent
                  key={stand.id}
                  stand={stand}
                  onMouseDown={handleMouseDownOnElement}
                  onClick={(s: TStand) => {
                    // if (!isAdmin || (isAdmin && !draggedRef.current)) {
                    //   setSelectedSpot(s);
                    // }
                    if (!draggedRef.current) {
                      setSelectedSpot(s);
                    }
                  }}
                  onResize={updateStandSize}
                  isAdmin={isAdmin} // Enable dragging/resizing
                />
              ))}
            </div>
          </div>

          {/* Right panel: Layout settings and Stand creation */}
          {isAdmin && (
            <div className="flex-1 space-y-4 min-w-[260px] max-w-[800px]">
              <EventlayoutSettingsForm
                preview={bgPreview}
                onBgImageChange={handleBgImageChange}
              />
              <StandForm onSubmit={addStand} />
            </div>
          )}
        </div>
      </form>
      {selectedSpot && (
        <SpotModal
          spot={selectedSpot}
          isAdmin={isAdmin}
          onClose={handleCloseModal}
          onUpdateStatus={(status: TSpotStatus) =>
            handleUpdateSpotStatus(selectedSpot.id, status)
          }
          onDelete={() => handleDeleteSpot(selectedSpot.id)}
        />
      )}
    </FormProvider>
  );
};

export default EventLayoutForm;
