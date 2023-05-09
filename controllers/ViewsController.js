export default class ViewsController {
  static getLoginForm = (req, res) => {
    res.status(200).render('login', {
      title: 'Log into your account',
    });
  };
}
