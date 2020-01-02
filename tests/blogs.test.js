const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
}, 50000);
// afterEach(async () => {
//     await page.close();
// });

describe("When logged in, ", () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a[class="btn-floating btn-large red"]');
    });
    test("can see blog create form", async () => {
        const text = await page.getContentsOf('form label');
        expect(text).toEqual('Blog Title')
    });
    describe("and using invalid inputs", () => {
        beforeEach(async () => {
            await page.click('form button');
        })
        test("the form shows an error message", async () => {
            const titleErr = await page.getContentsOf('.title .red-text')
            const contentErr = await page.getContentsOf('.content .red-text')
            expect(titleErr).toEqual("You must provide a value")
            expect(contentErr).toEqual("You must provide a value")
        });
    });
    describe('and using valid inputs', () => {
        beforeEach(async () => {
            await page.type('.title input', "Test Title");
            await page.type('.content input', "Test content");
            await page.click('form button');
        });
        test('takes user to review screen', async () => {
            const text = await page.getContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');
        });
        test('submitting then saving add blog to index', async () => {
            await page.click('button.green');
            await page.waitForSelector('.card')
            const text = await page.getContentsOf('.card-title');
            const para = await page.getContentsOf('p');
            expect(text).toEqual("Test Title");
            expect(para).toEqual("Test content");
        })
    });
});
describe("When user is not loggined in, ", () => {
    test("they cannot add blogs", async () => {
        const result = await page.evaluate(() => {
            return fetch('/api/blogs', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "My Title",
                    content: "My content"
                })
            }).then(res => res.json());
        })
        expect(result).toEqual({
            error: 'Login required'
        })
    });
    test('they cannot access any blogs', async () => {
        const result = await page.evaluate(async () => {
            return fetch('/api/blogs', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json());
        })
        expect(result).toEqual({
            error: 'Login required'
        })
    });
})