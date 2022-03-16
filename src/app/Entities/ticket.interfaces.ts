export interface CreateTicketInput {
     tittle: string
     dateRequest: string
     hour: string
     observation: string
     backup: string
     device: string
     status: string
     area : string;
     type: string;
     assignedBy: string;
}


export interface Ticket {
     _id: string
     tittle: string
     dateRequest: string;
     hour: string
     observation: string
     backup: string
     device: string
     status: string
     area: string
     type: string
     assignedBy: string
     assignedTo: string
     evaluation: string 
}

export interface DateFilterInput {
     startDate: string;
     endDate: string
}
