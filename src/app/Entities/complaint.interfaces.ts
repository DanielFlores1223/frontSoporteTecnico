export interface Complaint {
     createdBy: string;
     dateIncidence: string;
     technicianId: string;
     message: string;
     status: string;
     _id: string;
}

export interface CreateComplaint {
     createdBy: string;
     dateIncidence: string;
     technicianId: string;
     message: string;
     status: string;
}

export interface ComplaintViewTechnician {
     createdBy: string;
     dateIncidence: string;
     technicianId: string;
     message: string;
     status: string;
     forename: string
     surname: string
     email: string
     role: string
     area?: string
     id: string
}