import { NexusGenFieldTypes } from "generated/nexus-typegen";

type Category = Omit<NexusGenFieldTypes["ExerciseCategory"], 'exercises'>