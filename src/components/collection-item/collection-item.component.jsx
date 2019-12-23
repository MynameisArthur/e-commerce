import React from 'react';
import {connect} from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import {addItem} from '../../redux/cart/cart.actions';
import { CollectionItemContainer,ImageContainer } from './collection-item.styles';

const CollectionItem = ({item,addItem}) => {
    const {name,price,imageUrl} = item;
    return (
        <CollectionItemContainer>
            <ImageContainer style={{backgroundImage: `url(${imageUrl})`}}></ImageContainer> 
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton onClick={()=>addItem(item)} inverted> Add to cart </CustomButton>
        </CollectionItemContainer>
    );
};

const mapDispatchToProps = dispatch =>({
    addItem: item =>dispatch(addItem(item))
});

export default connect(null,mapDispatchToProps)(CollectionItem);
