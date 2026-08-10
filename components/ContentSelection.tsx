import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { RiMailSendLine } from "react-icons/ri";

export default function ContentSelection() {
    return (
        <div>
            <Item variant="outline">
                <ItemMedia variant='image'>
                    <RiMailSendLine 
                        color="blue"
                        size={25}
                    />
                </ItemMedia>
                <ItemContent className="flex">
                    <ItemTitle>Email</ItemTitle>
                    <ItemDescription>
                        Write clear effective emails that gets results
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
    )
}