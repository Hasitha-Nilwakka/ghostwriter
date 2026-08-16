import { Card, CardContent} from "@/components/ui/card";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { TbMoodSpark } from "react-icons/tb";
import FloatingTextareaWithCount from "./FloatingTextArea";
import SelectComboBox from "./SelectComboBox";
import { MdVideoSettings, MdDriveFileRenameOutline, MdOutlineStyle } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { genreArray } from "@/data/genreArray";
import { CgGhostCharacter } from "react-icons/cg";
import { TbShareplay, TbFileDescription, TbMoodHeart } from "react-icons/tb";
import SetStoryLength from "./SetStoryLength";
import { storyStyleArray } from "@/data/StoryStyleArray";
import { TfiTarget } from "react-icons/tfi";
import { storyAudienceArray } from "@/data/storyAudienceArray";
import { storyMoodArray } from "@/data/storyMoodArray";
import CharacterSetUp from "./character-setup/CharacterSetUp";


export default function StoryConfigurationForm() {
  return (
    <section className="flex flex-col gap-8 items-center">
        <Card className="p-0! max-w-3xl w-full gap-0">
            <CardContent className="py-4! px-6!">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full border-border sm:order-first order-last">
                  <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0">

                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <BsUiChecksGrid size={18}/>
                          Genre
                        </FieldLabel>
                        <SelectComboBox elementList={genreArray}/>
                      </Field>

                     <CharacterSetUp/>

                      <Field className="gap-1">
                        <FloatingTextareaWithCount label="Setting" maxLength={150} icon={MdVideoSettings}/>
                      </Field>

                      <Field className="flex! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <TbMoodSpark size={18}/>
                          Word length
                        </FieldLabel>
                        <SetStoryLength/>
                      </Field>

                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <MdOutlineStyle size={18}/>
                          Style
                        </FieldLabel>
                        <SelectComboBox elementList={storyStyleArray}/>
                      </Field>

                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <TfiTarget size={18}/>
                          Target audience
                        </FieldLabel>
                        <SelectComboBox elementList={storyAudienceArray}/>
                      </Field>

                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <TbMoodHeart size={18}/>
                          Mood
                        </FieldLabel>
                        <SelectComboBox elementList={storyMoodArray}/>
                      </Field>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
    </section>
  );
};
