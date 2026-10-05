export interface UpdateProfileDialogInterface {
    open: boolean;
    setOpen: (open: boolean)=> void 
}


export interface ReportDialogInterface {
    open: boolean;
    setOpen: (open: boolean)=> void ,
    reportedUserId: string
}
