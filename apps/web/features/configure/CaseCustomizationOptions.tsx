"use client";
import React, { FC } from "react";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import {
  Description,
  Radio,
  RadioGroup,
  Label as RadioLabel,
} from "@headlessui/react";

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
  Label,
} from "@casecobra/ui";

import { formatPrice } from "@/utils/helper";
import { BASE_PRICE } from "@/utils/config";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/utils/constants";
import type { Options } from "./DesignConfigurator";

interface CaseCustomizationOptionsProps {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  onContinue: () => void;
  isLoading: boolean;
}

const CaseCustomizationOptions: FC<CaseCustomizationOptionsProps> = ({
  options,
  setOptions,
  onContinue,
  isLoading,
}) => {
  return (
    <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
      <ScrollArea className="relative flex-1 overflow-auto">
        <div
          aria-hidden="true"
          className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
        />

        <div className="px-8 pb-12 pt-8">
          <h2 className="tracking-tight text-gray-800 font-bold text-2xl">
            Customize your case
          </h2>

          <div className="w-full h-px bg-zinc-200 my-5" />

          <div className="relative mt-4 h-full flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <RadioGroup
                value={options.color}
                onChange={(val) => {
                  setOptions((prev) => ({
                    ...prev,
                    color: val,
                  }));
                }}
              >
                <Label>Color: {options.color.label}</Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={({ checked }) =>
                        cn(
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`border-${color.tw}`]: checked,
                          }
                        )
                      }
                    >
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          "h-8 w-8 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>

              <div className="relative flex flex-col gap-3 w-full">
                <Label>Model</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {options.model.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.label}
                        className={cn(
                          "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                          {
                            "bg-zinc-100": model.label === options.model.label,
                          }
                        )}
                        onClick={() => {
                          setOptions((prev) => ({ ...prev, model }));
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            model.label === options.model.label
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {[MATERIALS, FINISHES].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        [name]: val,
                      }));
                    }}
                  >
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={({ checked }) =>
                            cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                "border-primary": checked,
                              }
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioLabel
                                className="font-medium text-gray-900"
                                as="span"
                              >
                                {option.label}
                              </RadioLabel>

                              {option.description ? (
                                <Description
                                  as="span"
                                  className="text-gray-500"
                                >
                                  <span className="block sm:inline">
                                    {option.description}
                                  </span>
                                </Description>
                              ) : null}
                            </span>
                          </span>

                          <Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                          >
                            <span className="font-medium text-gray-900">
                              {formatPrice(option.price / 100)}
                            </span>
                          </Description>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                )
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="w-full px-8 h-20 bg-white">
        <div className="h-px w-full bg-zinc-200" />
        <div className="w-full h-full flex justify-end items-center">
          <div className="w-full flex gap-6 items-center">
            <p className="font-medium whitespace-nowrap">
              {formatPrice(
                (BASE_PRICE + options.finish.price + options.material.price) /
                  100
              )}
            </p>
            <Button
              loadingText="Saving..."
              size="lg"
              className="w-full"
              onClick={onContinue}
              isLoading={isLoading}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1.5 inline" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCustomizationOptions;
