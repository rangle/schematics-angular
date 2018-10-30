import { <%= classify(name) %> } from './<%= dasherize(name) %>.interface';

describe('<%= classify(name) %>', () => {
  let <%= camelize(name) %>: <%= classify(name) %>;

  describe('when the <%= classify(name) %> is in a certain state', () => {
    beforeEach(() => {
      <%= camelize(name) %> = {} as <%= classify(name) %>;
    });

    it('should be true', () => {
      expect(<%= camelize(name) %>).toEqual({} as <%= classify(name) %>);
    });
  });
});