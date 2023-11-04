import { AssignmentDataObject } from "../domain/assignmentInterfaces";
import AssignmentsRepositoryInterface from "../domain/AssignmentsRepositoryInterface";

export class SubmitAssignment {
  constructor(private assignmentsRepository: AssignmentsRepositoryInterface) {}

  async submitAssignment(assignmentId: number, link: string) {
    try {
      const foundAssignment: AssignmentDataObject | null =
        await this.assignmentsRepository.getAssignmentById(assignmentId);

      if (foundAssignment !== null) {
        foundAssignment.link = link;
        foundAssignment.state = "in progress";

        return await this.assignmentsRepository.updateAssignment(
          assignmentId,
          foundAssignment
        );
      } else {
        throw new Error("No se encontró la tarea");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
