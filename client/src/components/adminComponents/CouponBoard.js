import React, { useState } from 'react'
import AddCoupons from "./AddCoupons";
import Coupon from "./AllCoupons"
import Button from '@mui/material/Button';

const CouponBoard = () => {

    const [isAdding, setIsAdding] = useState(false);

    const handleAddingToggle = () => {
        setIsAdding(!isAdding);
    };

    return (
        <div>
            {isAdding ? (
                <AddCoupons onAddingToggle={handleAddingToggle} />
            ) : (
                <Coupon />
            )}
            {!isAdding && (
                <Button onClick={handleAddingToggle} variant="contained"
                    sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight: "bold" }}>
                    Add
                </Button>
            )}
        </div>
    )
}

export default CouponBoard