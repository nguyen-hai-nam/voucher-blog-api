export interface RegisterBody {
	email: string;
	password: string;
}

export interface LoginBody {
	email: string;
	password: string;
}

export interface ChangePasswordBody {
	oldPassword: string;
	newPassword: string;
}
