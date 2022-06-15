import { escapeHtml } from '../../lib/escape-html';

export default (req, res) => {
  res.send(
    "Something went terribly wrong!<br>All we've got is this message:<br><br>" +
      escapeHtml(req.query.message)
  );
};
