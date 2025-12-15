export interface ICategoryResponse {
    code?: number;
    message?: string;
    data?: ICategoryData[];
}

export interface ICategoryData {
    code?: string;
    name?: string;
    color?: string;
    threshold?: number;
    total_persons?: number;
    person_images?: string[];
    is_pinned?: boolean;
}
