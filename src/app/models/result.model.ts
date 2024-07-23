export class ResultModel<T>{
    data?: T | null = null;
    isSuccessful: boolean = true;
    errorMessages?: string[] | null = null;
}