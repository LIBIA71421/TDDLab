import { AssignmentDataObject } from "../domain/assignmentInterfaces";
import  AssignmentsRepositoryInterface  from "../domain/AssignmentsRepositoryInterface";

export class SubmitAssignment {
  constructor(private assignmentsRepository: AssignmentsRepositoryInterface) {}

  async submitAssignment(assignmentId: number) {
    try {
      const foundAssignment: AssignmentDataObject | null = await this.assignmentsRepository.getAssignmentById(assignmentId);

      if (foundAssignment !== null) {
        foundAssignment.state = 'delivered';
        return await this.assignmentsRepository.updateAssignment(assignmentId, foundAssignment);
        
      } else {
        throw new Error("No se encontró la tarea");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
