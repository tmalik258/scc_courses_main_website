export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
}

export const getDisplayName = (user: UserProfile): string => {
  if (user.fullName) {
    return user.fullName.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' ');
  } else if (user.email) {
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  }
  return "User";
};