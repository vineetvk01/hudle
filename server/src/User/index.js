import buildMakeUser from './model';
import * as validation from '../validations';
import sanitizeHtml from 'sanitize-html';
import * as db from './db';

export const User = buildMakeUser({ validation, sanitize });

function sanitize(text) {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it'],
  });
};

//instance function
User.prototype.save = async function () {
  const { id } = await db.insert({
    firstName: this.getFirstName(),
    lastName: this.getLastName(),
    email: this.getEmail(),
    password: this.getPassword(),
    gender: this.getGender(),
    type: this.getType(),
    createdAt: this.getCreatedAt(),
    lastLoginAt: this.getLastLoginAt(),
  });
  console.log('New Login/User Added, id: ', id);
  this.id = id;
}

//static function
User.fetch = async function ({email, password}) {
  const user = await db.select({
    email,
    password
  })
  return user || {};
}