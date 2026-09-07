export interface User{

    _id: string;
    name: string;
    email: string;
    image: string;
    role: string
}


export interface Location{
    latitide: number;
    longitube: number;
    formattedAddress: string;
}


export interface AppContextType{
    user: User | null;
    loading: boolean;
    isAuth: boolean;
    location: Location | null;
    setUser: React.Dispatch<React.SetStateAction<User| null>>;

    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}