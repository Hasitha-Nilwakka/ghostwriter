import { Field, FieldTitle } from "@/components/ui/field";
import { CgGhostCharacter } from "react-icons/cg";
import { TbShareplay, TbFileDescription, TbPlaylistAdd } from "react-icons/tb";
import FloatingTextareaWithCount from "../FloatingTextArea";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {Button} from '@/components/ui/button'
import CharacterList from "./CharacterList";

export default function CharacterSetUp() {
    return (
        <div>
            <Field className="flex! justify-center! mt-3! border border-muted rounded-md py-5 px-5 shadow-sm gap-0!">
                <FieldTitle className="text-sm text-muted-foreground font-normal">
                    <CgGhostCharacter size={18}/>
                    Characters (0/4)
                </FieldTitle>
                <div className="px-2">
                    <Field>
                        <FloatingTextareaWithCount label="Character name" maxLength={150} icon={MdDriveFileRenameOutline}/>
                    </Field>
                    <Field>
                        <FloatingTextareaWithCount label="Character role" maxLength={150} icon={TbShareplay}/>
                    </Field>
                    <Field>
                        <FloatingTextareaWithCount label="Character description" maxLength={150} icon={TbFileDescription}/>
                    </Field>
                </div>
                <Button variant='secondary'>
                    <TbPlaylistAdd size={18}/>
                    Add Character
                </Button>
                <div className="py-2">
                    <CharacterList/>
                </div>
            </Field>
        </div>
    )
}