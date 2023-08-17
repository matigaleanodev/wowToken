interface Links {
    self: {
        href: string;
    };
}

export interface TokenInfo {
    _links: Links;
    last_updated_timestamp: number;
    price: number;
}