export const useGetUserAddress = () => {
  return window.localStorage.getItem('userAddress');
}