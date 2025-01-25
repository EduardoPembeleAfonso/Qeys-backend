export interface CustomFile extends Express.Multer.File {
  fileUrl?: string;
}
