import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  avatar: string;
  title: string;
  image: string;
  likes: number;
  comments: number;
  riderRating: number;
  bikeRating: number;
  bikeModel: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: 'Александр "Железный"',
    avatar: 'https://cdn.poehali.dev/projects/a6ddbe3e-a918-4c0e-80fe-11ceca80cc36/files/90aeac36-8cb2-44f1-bf68-c82f1f6ad610.jpg',
    title: 'Ночной рейд по кольцевой',
    image: 'https://cdn.poehali.dev/projects/a6ddbe3e-a918-4c0e-80fe-11ceca80cc36/files/8153a6ae-fc6c-45ba-b4be-e7b7ad12584e.jpg',
    likes: 247,
    comments: 34,
    riderRating: 4.8,
    bikeRating: 4.9,
    bikeModel: 'Harley-Davidson Iron 883'
  },
  {
    id: 2,
    author: 'Максим "Гром"',
    avatar: 'https://cdn.poehali.dev/projects/a6ddbe3e-a918-4c0e-80fe-11ceca80cc36/files/90aeac36-8cb2-44f1-bf68-c82f1f6ad610.jpg',
    title: 'Кастомный чоппер готов к сезону',
    image: 'https://cdn.poehali.dev/projects/a6ddbe3e-a918-4c0e-80fe-11ceca80cc36/files/8e8360b6-d72c-48f3-9a11-b7a91f8e46e2.jpg',
    likes: 189,
    comments: 28,
    riderRating: 4.6,
    bikeRating: 5.0,
    bikeModel: 'Custom Chopper'
  }
];

const topRiders = [
  { name: 'Андрей "Буран"', rating: 5.0, rides: 342, avatar: 'AB' },
  { name: 'Сергей "Молот"', rating: 4.9, rides: 298, avatar: 'СМ' },
  { name: 'Дмитрий "Вихрь"', rating: 4.8, rides: 267, avatar: 'ДВ' }
];

const topBikes = [
  { model: 'Kawasaki Ninja H2R', rating: 5.0, owner: 'Андрей "Буран"' },
  { model: 'BMW S1000RR', rating: 4.9, owner: 'Сергей "Молот"' },
  { model: 'Ducati Panigale V4', rating: 4.8, owner: 'Дмитрий "Вихрь"' }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Bike" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold metal-text">MOTO RIDERS</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm">
              <Icon name="Home" size={18} className="mr-2" />
              Лента
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="Calendar" size={18} className="mr-2" />
              События
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="Wrench" size={18} className="mr-2" />
              Гараж
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="Users" size={18} className="mr-2" />
              Сообщества
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Магазин
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="Map" size={18} className="mr-2" />
              Карта
            </Button>
          </nav>

          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-primary hover:ring-primary/70 transition-all">
                <AvatarImage src="https://cdn.poehali.dev/projects/a6ddbe3e-a918-4c0e-80fe-11ceca80cc36/files/90aeac36-8cb2-44f1-bf68-c82f1f6ad610.jpg" />
                <AvatarFallback>МП</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Профиль райдера</DialogTitle>
              </DialogHeader>
              <RiderProfile {...mockRiderProfile} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 metal-gradient brutal-shadow">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary">
                  <AvatarFallback>МП</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Поделись историей, братан..."
                    className="w-full bg-background/50 border border-border rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </Card>

            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden brutal-shadow hover:brutal-shadow transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{post.author}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Star" size={14} className="text-primary fill-primary" />
                            <span>{post.riderRating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="metal-gradient text-white border-0">
                        <Icon name="Trophy" size={14} className="mr-1" />
                        Райдер
                      </Badge>
                    </div>

                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>

                    <div className="relative mb-4 rounded overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur rounded p-3">
                        <div className="flex items-center gap-2">
                          <Icon name="Bike" size={18} className="text-primary" />
                          <span className="text-sm font-medium">{post.bikeModel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Star" size={16} className="text-primary fill-primary" />
                          <span className="font-bold">{post.bikeRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Icon name="Heart" size={20} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Icon name="MessageCircle" size={20} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Icon name="Share2" size={20} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 metal-gradient">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} className="text-primary" />
                Топ Рейтинги
              </h2>

              <Tabs defaultValue="riders" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-background/50">
                  <TabsTrigger value="riders">Райдеры</TabsTrigger>
                  <TabsTrigger value="bikes">Мотоциклы</TabsTrigger>
                </TabsList>

                <TabsContent value="riders" className="space-y-3 mt-4">
                  {topRiders.map((rider, index) => (
                    <Dialog key={rider.name}>
                      <DialogTrigger asChild>
                        <div
                          className="flex items-center gap-3 p-3 bg-background/50 rounded hover:bg-background/70 transition-colors cursor-pointer"
                        >
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                            {index + 1}
                          </div>
                          <Avatar className="h-10 w-10 ring-2 ring-primary/50">
                            <AvatarFallback className="bg-primary/20">{rider.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{rider.name}</p>
                            <p className="text-xs text-muted-foreground">{rider.rides} поездок</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="text-primary fill-primary" />
                            <span className="font-bold text-sm">{rider.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Профиль райдера</DialogTitle>
                        </DialogHeader>
                        <RiderProfile 
                          {...mockRiderProfile}
                          name={rider.name.split('"')[0].trim()}
                          nickname={rider.name}
                          rating={rider.rating}
                          stats={{
                            ...mockRiderProfile.stats,
                            totalRides: rider.rides
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </TabsContent>

                <TabsContent value="bikes" className="space-y-3 mt-4">
                  {topBikes.map((bike, index) => (
                    <div
                      key={bike.model}
                      className="flex items-center gap-3 p-3 bg-background/50 rounded hover:bg-background/70 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Bike" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{bike.model}</p>
                        <p className="text-xs text-muted-foreground">{bike.owner}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-primary fill-primary" />
                        <span className="font-bold text-sm">{bike.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Trophy" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Стань легендой</h3>
                  <p className="text-sm text-muted-foreground">
                    Участвуй в рейдах, делись опытом и поднимайся в рейтинге!
                  </p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 mt-2">
                Узнать больше
              </Button>
            </Card>

            <Card className="p-6 metal-gradient">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Icon name="Flame" size={20} className="text-primary" />
                Скоро события
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-background/50 rounded">
                  <p className="font-semibold text-sm mb-1">Ночной рейд "Асфальт"</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    28 ноября, 22:00
                  </p>
                </div>
                <div className="p-3 bg-background/50 rounded">
                  <p className="font-semibold text-sm mb-1">Bike Show 2025</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    5 декабря, 12:00
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}