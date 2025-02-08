export interface IBlog{
    id: string,
    slug: string,
    imageUrl: string,
    titleAr: string,
    titleEn: string,
    createdDate: string,
    descriptionAr: string,
    descriptionEn: string,
}

export type IBlogTitleLang = 'titleAr' | 'titleEn';
export type IBlogDescriptionLang = 'descriptionAr' | 'descriptionEn';