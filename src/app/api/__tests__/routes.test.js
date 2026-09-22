import { POST as createList } from '../join/route';
import { POST as addItem } from '../addItem/route';
import { POST as register } from '../register/route';
import { shoppingLists } from '../data';

function makeRequest(body) {
  return { json: async () => body };
}

beforeEach(() => {
  for (const key of Object.keys(shoppingLists)) {
    delete shoppingLists[key];
  }
});

describe('POST /api/register', () => {
  it('creates a new shopping list and returns a code', async () => {
    const response = await register();
    const data = await response.json();

    expect(data.code).toHaveLength(6);
    expect(shoppingLists[data.code]).toEqual({ items: [], members: [] });
  });
});

describe('POST /api/join', () => {
  it('adds a member to an existing list', async () => {
    shoppingLists['abc123'] = { items: [], members: [] };

    const response = await createList(makeRequest({ code: 'abc123', memberName: 'Alice' }));
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(shoppingLists['abc123'].members).toEqual(['Alice']);
  });

  it('returns 404 when the list does not exist', async () => {
    const response = await createList(makeRequest({ code: 'missing', memberName: 'Alice' }));
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('List not found');
  });
});

describe('POST /api/addItem', () => {
  it('adds an item to an existing list', async () => {
    shoppingLists['abc123'] = { items: [], members: [] };

    const response = await addItem(makeRequest({ code: 'abc123', itemName: 'Milk' }));
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(shoppingLists['abc123'].items).toHaveLength(1);
    expect(shoppingLists['abc123'].items[0]).toMatchObject({
      name: 'Milk',
      reservedBy: null,
      completed: false,
    });
  });

  it('returns 404 when the list does not exist', async () => {
    const response = await addItem(makeRequest({ code: 'missing', itemName: 'Milk' }));
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('List not found');
  });
});
