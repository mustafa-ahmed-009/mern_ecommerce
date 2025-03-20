const moongose = require('mongoose');   
const reviewSchema = new moongose.Schema({
    title: {
        type: String,
    }, 
    ratings: {
        type: Number,
        min: [1, 'Min ratings value is 1.0'],
        max: [5, 'Max ratings value is 5.0'],
        required: [true, 'review ratings required'],
      },
    user: {
        type: moongose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }, 
    product: {
        type: moongose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
}, { timestamps: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({ path:'user', select: 'name _id' });
    next();
}); 

reviewSchema.statics.calcAverageRatings = async function (productId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$ratings' }
            }
        }
    ]);
    if (stats.length > 0) {
        
        await moongose.model('Product').findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await moongose.model('Product').findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage:0
        });
    }
    console.log(stats); 
    
}
reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.product);
});
reviewSchema.post('remove', function () {
    this.constructor.calcAverageRatings(this.product);
});
module.exports = moongose.model('Review', reviewSchema);