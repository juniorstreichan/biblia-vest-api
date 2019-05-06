// eslint-disable-next-line import/prefer-default-export
export function noBodyRequest(req) {
  return !req.body || Object.keys(req.body).length <= 0;
}
