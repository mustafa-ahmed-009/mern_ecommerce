import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import HomeViewProductsContainer from '../../home/presentation/components/produccts/HomeViewProductsContainer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  colors: string[];
  images: string[];
  brand: string;
  specs: string[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetails: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  // Mock data based on the images
  const product: Product = {
    id: '1',
    name: 'آيفون XR بذاكرة سعة 128 جيجابايت ودعم تقنية 4G LTE مع تطبيق فيس تايم (بروديكت) أحمر',
    description: 'يتميز بوجود بطاقة SIM مزدوجة، بطاقة عملية وبطاقة e-SIM يمكنك منح فصل هاتفك الآيفون وتسجيل الدخول إلى التطبيقات والحسابات بضغطة سهولة وتتمتع كاميرا معرف الوجه السريع والتأكد أمانًا للمصادقة عن طريق بصمة الوجه بشريحة A12 بايونيك والتي تعد أذكى وأقوى شريحة في الهواتف الذكية شحنت أكبر كاميرات العالم شهرة عمرًا جديدًا من التصوير الفوتوغرافي حيث يعمل جهاز الإستشعار الابتكاري بخاصية ISP والمحرك العصبي، ما يمكنك من التقاط صور لم يسبق لها مثيل كاميرا محسنة وعدسة تجعل الأشخاص الموجودين في الأمام في نطاق تركيز دقيق على عكس نطاق الخلفية غير الواضح نظرة عامة',
    price: 34000,
    rating: 4.5,
    colors: ['black', 'red'],
    images: ['https://istore.co.na/cdn/shop/files/iPhone_15_Blue_PDP_Image_Position-1__WWEN_2048x.jpg?v=1696891208', 'https://images-cdn.ubuy.qa/655c545dbb710426c41a22c8-apple-iphone-15-pro-max-1-tb-mavi.jpg'],
    brand: 'سامسونج',
    specs: ['128 جيجابايت', '4G LTE', 'تطبيق فيس تايم']
  };

  const reviews: Review[] = [
    {
      id: '1',
      author: 'علي محمد',
      rating: 3,
      comment: '',
      date: 'منذ 650 يوم'
    },
    {
      id: '2',
      author: 'أحمد محمود',
      rating: 4.1,
      comment: 'منتج مناسب سعره للوقت الحالي وجه كويس جدا ومعاه دراع زيادة',
      date: ''
    },
    {
      id: '3',
      author: 'أحمد محمود',
      rating: 4.1,
      comment: 'منتج مناسب سعره للوقت الحالي وجه كويس جدا ومعاه دراع زيادة',
      date: ''
    },
    {
      id: '4',
      author: 'أحمد محمود',
      rating: 4.1,
      comment: 'منتج مناسب سعره للوقت الحالي وجه كويس جدا ومعاه دراع زيادة',
      date: ''
    }
  ];

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    console.log('Added to cart!');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', reviewText);
    setReviewText('');
  };

  // Render Rating Stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            size={16} 
            className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className=" bg-gray-100 min-h-screen" dir="rtl">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 space-x-reverse">
            {['الكل', 'إلكترونيات', 'ملابس', 'كهربائية', 'تخفيضات', 'تخفيضات', 'تخفيضات', 'تخفيضات', 'تخفيضات', 'المزيد'].map((item, index) => (
              <a key={index} href="#" className="text-sm hover:text-gray-300">{item}</a>
            ))}
          </div>
        </div>
      </header>

      {/* Product Section */}
      <main className="container mx-auto p-4 bg-white my-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2 relative">
            <div className="relative aspect-square bg-gray-100 rounded-lg">
              <img 
                src={product.images[currentImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                &lt;
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                &gt;
              </button>
            </div>
          </div>
          { }
          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <span className="text-sm text-gray-500">:الإلكترونيات</span>
              <h1 className="text-xl font-bold mt-2">{product.name}</h1>
              <div className="flex items-center mt-2">
                {renderStars(product.rating)}
                <span className="text-yellow-500 mr-1">{product.rating}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">:الماركة</span>
                <span>{product.brand}</span>
              </div>
              
              <div className="mt-4">
                <span className="text-gray-500 block mb-2">:اللون</span>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-gray-500 block mb-2">:المواصفات</span>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-xl font-bold">{product.price.toLocaleString()} جنيه</span>
              <button 
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
              >
                أضف للعربة
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Reviews Section */}
      <section className="container mx-auto p-4 bg-white my-4 rounded-lg shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">التقييمات</h2>
          <div className="flex items-center">
            <span className="text-yellow-500 ml-2">{product.rating}</span>
            <span className="text-gray-500 ml-2">({reviews.length} تقييم)</span>
          </div>
        </div>

        {/* Add Review */}
        <form onSubmit={handleReviewSubmit} className="mb-6">
          <div className="mb-2">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="اكتب تعليقك..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <button 
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            اضف تعليق
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium ml-2">{review.author}</span>
                  {renderStars(review.rating)}
                  <span className="text-yellow-500 mr-1">{review.rating}</span>
                </div>
                {review.date && <span className="text-sm text-gray-500">{review.date}</span>}
              </div>
              {review.comment && <p className="mt-2 text-gray-700">{review.comment}</p>}
            </div>
          ))}
        </div>
        <HomeViewProductsContainer title='منتجات قد تعجبك'/>
      </section>
    </div>
  );
};

export default ProductDetails;