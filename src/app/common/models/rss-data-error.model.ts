export class RssDataError {
  isErrorReponse: boolean;
  isMappingError: boolean;
  rawError: any;

  constructor(props) {
    this.isErrorReponse = props.isErrorReponse;
    this.isMappingError = props.isMappingError;
    this.rawError = props.rawError;
  }
}
