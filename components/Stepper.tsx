"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RxMixerVertical, RxMix, RxMagicWand, RxCheckCircled } from "react-icons/rx";
import ContentSelector from "./ContentSelector";
import EmailConfigurationForm from "../feature/email/EmailConfigurationForm";
import SocialMediaConfigurationForm from "@/feature/social/SocialMediaConfigurationForm";
import StoryConfigurationForm from "../feature/story/StoryConfirgurationForm";
import { useContentSelection } from "@/store/contentTypeStore";

interface Step {
  title: string;
  innerTitle : string;
  description: string;
  content: string;
  icon: IconType;
}

const steps: Step[] = [
  {
    title: "Select",
    innerTitle : "What will you create?",
    description: "Content type",
    content: "Select the type of content you want to create",
    icon: RxMix,
  },
  {
    title: "Configure",
    innerTitle : "Let's configure your selection",
    description: "Setup your request",
    content: "Fine tune your output, tell me exactly what you want",
    icon: RxMixerVertical,
  },
  {
    title: "Generate",
    innerTitle : "This where the magic happens",
    description: "Ghostify",
    content: "",
    icon: RxMagicWand,
  },
];

export default function Stepper() {
  const selectedContent = useContentSelection((state) => state.selectedContent)
  const resetContentSelection = useContentSelection((state) => state.resetContent)
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    resetContentSelection()
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 border border-border rounded-xl bg-background shadow-xs space-y-4 mb-10">
      {/* Stepper Header */}
      <div className="relative flex items-center justify-between w-full">
        {/* Background Connector Line */}
        <div
          className="absolute h-0.5 bg-border"
          style={{ left: "16.67%", right: "16.67%", top: "18px" }}
        />

        {/* Animated Active/Completed Progress Line */}
        <motion.div
          className="absolute h-0.5 bg-primary-col origin-left"
          style={{ left: "16.67%", right: "16.67%", top: "18px" }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: activeStep / (steps.length - 1),
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < activeStep;
          const isActive = idx === activeStep;
          return (
            <div
              key={step.title}
              className="flex flex-col items-center flex-1 relative group cursor-pointer"
              onClick={() => setActiveStep(idx)}
            >
              {/* Step Icon Box */}
              <motion.div
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-300 shadow-sm relative z-10",
                  isCompleted || isActive
                    ? "bg-primary-col text-primary-foreground rounded-full"
                    : "bg-muted text-muted-foreground"
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {isCompleted ? (
                  <RxCheckCircled className="w-5 h-5"/>
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </motion.div>

              {/* Step Labels */}
              <div className="mt-3 text-center space-y-1 px-2 select-none">
                <p
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isActive || isCompleted
                      ? "text-text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "text-xs transition-colors duration-300 hidden sm:block",
                    isActive || isCompleted
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <hr className="border-border/50 p-0!"/>

      {/* Stepper Content Area with animations */}
      <div className="min-h-32 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {steps[activeStep].innerTitle}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {steps[activeStep].content}
            </p>
            {activeStep === 0 && (
              <ContentSelector/>
            )}
            {activeStep === 1 && selectedContent === 'email' && (
              <EmailConfigurationForm onValidSubmission={handleNext}/>
            )}
            {activeStep === 1 && selectedContent === 'social_media' && (
              <SocialMediaConfigurationForm/>
            )}
            {activeStep === 1 && selectedContent === 'story' && (
              <StoryConfigurationForm/>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Stepper Footer Controls */}
      <div className="flex justify-between items-center pt-2">
        <Button
          variant='outline'
          onClick={handleBack}
          disabled={activeStep === 0}
          className={cn("cursor-pointer text-primary-col border-primary-col", "disabled:opacity-50 disabled:pointer-events-none")}
        >
          Back
        </Button>

        <div className="flex items-center gap-2">
          {activeStep === steps.length - 1 ? (
            <Button
              variant={'secondary'}
              className="cursor-pointer bg-primary-col text-white"
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : (
            <Button
              type='submit'
              form='email-config'
              onClick={activeStep === 1 ? undefined : handleNext}
              className=" hover:bg-primary/90 cursor-pointer bg-primary-col"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}