import React, { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Heart, ShoppingBag, Search, Filter, Share2, X, Trash2 } from 'lucide-react';

const LuxuryBoutiqueStore = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Сумка Vsling small",
      price: 343000,
      category: "accessories",
      size: "Высота 16,5 см, ширина 21,8 см, глубина 10,8 см, длина ремешка 120 см",
      image: "https://th.bing.com/th/id/OIP.R363tph3fsuKKgMISHZNeAHaJ4?rs=1&pid=ImgDetMain",
      description: "Небольшую сумку VSling со съемным плечевым ремнем, который можно удлинить цепочкой, сшили из телячьей кожи. Внутри основного отделения с магнитной застежкой разместили карман. Плоский отсек дополнили пряжкой в виде эмблемы VLogo Signature.",
      designer: "VALENTINO",
      isNew: true,
      discount: null,
      colors: ["Beige"]
    },
    {
      id: 2,
      name: "Классический костюм",
      price: 350000,
      category: "suits",
      size: "L",
      image: "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1590427809/630137_Z596D_4440_001_100_0000_Light-Slim-fit-wool-mohair-suit.jpg",
      description: "Безупречный костюм из английской шерсти с шелковыми лацканами",
      designer: "Gucci",
      isNew: false,
      discount: 15,
      colors: ["Black"]
    }
  ]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart management functions
  const addToCart = (product) => {
    setIsCartOpen(true);
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return sum + price * quantity;
    }, 0);
  };

  const categories = [
    { value: "dresses", label: "Вечерние платья" },
    { value: "suits", label: "Костюмы" },
    { value: "outerwear", label: "Верхняя одежда" },
    { value: "accessories", label: "Аксессуары класса люкс" },
    { value: "jewelry", label: "Ювелирные изделия" },
    { value: "shoes", label: "Обувь премиум" }
  ];

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wider">QUE DIEU BÉNISSE</h1>
          <p className="text-gray-600 italic">Воплощение элегантности и стиля</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-2/5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              className="pl-12 bg-white border-gray-200 w-full"
              placeholder="Поиск предметов роскоши..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={activeFilter} onValueChange={setActiveFilter}>
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter size={20} /> Фильтры
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] object-cover"  // Adjust height for better visibility
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm">
                      NEW
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{product.designer}</div>
                  <h3 className="text-xl font-light mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-lg font-semibold">
                        {product.discount ? (
                          <>
                            <span className="line-through text-gray-400 mr-2">
                              {product.price.toLocaleString()} ₽
                            </span>
                            <span className="text-red-600">
                              {(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                            </span>
                          </>
                        ) : (
                          `${product.price.toLocaleString()} ₽`
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Размер: {product.size}</div>
                    </div>
                    <div className="flex gap-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      variant="secondary" 
                      className="w-full" 
                      onClick={() => addToCart(product)} // Add to cart button
                    >
                      Добавить в корзину
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shopping Cart Slide-out */}
        {isCartOpen && (
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 z-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Корзина</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Корзина пуста
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-light">{item.name}</h4>
                        <p className="text-sm text-gray-600">Размер: {item.size}</p>
                        <p className="font-semibold">
                          {(item.discount ? 
                            item.price * (1 - item.discount / 100) : 
                            item.price
                          ).toLocaleString()} ₽
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity || 1}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
                  <div className="flex justify-between mb-4 text-xl font-light">
                    <span>Итого:</span>
                    <span>{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full">Оформить заказ</Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuxuryBoutiqueStore;