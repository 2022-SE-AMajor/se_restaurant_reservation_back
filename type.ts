export type UserProps = {
    id: string;
    pw: string;
};

export type ReservationProps = {
    covers: number;
    date: string;
    time: string;
    table_id: number;
    customer_id: string;
    arrival_time: any;
};

export type UserArrive = {
    date: string;
    time: string;
    customer_id: string;
};
