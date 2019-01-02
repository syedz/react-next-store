import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
    id: 'ABC123',
    title: 'A Cool Item',
    price: 5000,
    description: 'This item is really cool',
    image: 'dog.jpg',
    largeImage: 'largeDog.jpg'
};

describe('<Item/>', () => {
    it('renders the image properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const img = wrapper.find('img');

        expect(img.props().src).toBe(fakeItem.image);
        expect(img.props().alt).toBe(fakeItem.title);
    });

    it('renders the pricetag and title', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const PriceTag = wrapper.find('PriceTag');
        // console.log(PriceTag.dive().text());
        // console.log(PriceTag.children().text());
        expect(PriceTag.children().text()).toBe('$50');
        expect(wrapper.find('Title a').text()).toBe(fakeItem.title);

        const img = wrapper.find('img');
        expect(img.props().src).toBe(fakeItem.image);
        expect(img.props().alt).toBe(fakeItem.title);
        // console.log(wrapper.debug());
    });

    it('renders out the buttons properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const buttonList = wrapper.find('.buttonList');

        // console.log(buttonList.debug());

        expect(buttonList.children()).toHaveLength(3);
        expect(buttonList.find('Link').exists()).toBe(true);
        // expect(buttonList.find('AddToCart').exists()).toBe(true);
        // expect(buttonList.find('DeleteItem').exists()).toBe(true);
    });
});
