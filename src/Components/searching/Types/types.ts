export interface Props {
  chooseOption: {
    searching: {
      searchedData: string;
      setSearchingVisible: (value: boolean) => void;
    };
  };
}
export type Details = [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  boolean,
  number,
];
