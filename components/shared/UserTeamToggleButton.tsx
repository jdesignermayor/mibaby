import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function UserTeamToggleButton() {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          className="w-full justify-between cursor-pointer"
          variant={"outline"}
        >
          <div className="flex gap-2 items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="https://img.freepik.com/vector-gratis/plantilla-logotipo-consultorio-medico_23-2149665572.jpg"
                className="rounded-md"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            TEAM NAME
          </div>
          <ChevronsUpDownIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-[16rem]">
        <div className="flex gap-2 items-center">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="https://img.freepik.com/vector-gratis/plantilla-logotipo-consultorio-medico_23-2149665572.jpg"
                  className="rounded-md"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Label htmlFor="option-one">Team One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="https://img.freepik.com/vector-gratis/diseno-logotipo-hospital-vector-cruz-medica_53876-136743.jpg?semt=ais_hybrid&w=740&q=80"
                  className="rounded-md"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Label htmlFor="option-two">Team Two</Label>
            </div>
          </RadioGroup>
        </div>
        <hr />
        <Button className="w-full cursor-pointer">
          <PlusIcon />
          Create team
        </Button>
      </PopoverContent>
    </Popover>
  );
}
