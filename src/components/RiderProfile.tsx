import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: number;
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

interface RiderStats {
  totalRides: number;
  totalKm: number;
  avgSpeed: number;
  topSpeed: number;
  nightRides: number;
  groupRides: number;
}

interface RiderProfileProps {
  name: string;
  nickname: string;
  avatar: string;
  rating: number;
  level: number;
  levelProgress: number;
  stats: RiderStats;
  achievements: Achievement[];
  bikeModel: string;
  bikeRating: number;
  memberSince: string;
}

export default function RiderProfile({
  name,
  nickname,
  avatar,
  rating,
  level,
  levelProgress,
  stats,
  achievements,
  bikeModel,
  bikeRating,
  memberSince
}: RiderProfileProps) {
  return (
    <Card className="p-6 space-y-6 metal-gradient">
      <div className="flex items-start gap-4">
        <Avatar className="h-24 w-24 ring-4 ring-primary">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-2xl">{nickname[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">{nickname}</h2>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">
              <Icon name="Award" size={12} className="mr-1" />
              LVL {level}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{name}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={18} className="text-primary fill-primary" />
              <span className="font-bold text-lg">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/5.0</span>
            </div>
            <div className="text-sm text-muted-foreground">
              На платформе с {memberSince}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">До уровня {level + 1}</span>
              <span className="font-semibold">{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold flex items-center gap-2">
          <Icon name="Bike" size={18} className="text-primary" />
          Текущий мотоцикл
        </h3>
        <div className="p-3 bg-background/50 rounded flex items-center justify-between">
          <div>
            <p className="font-semibold">{bikeModel}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Star" size={14} className="text-primary fill-primary" />
              <span>{bikeRating.toFixed(1)}</span>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold flex items-center gap-2">
          <Icon name="BarChart3" size={18} className="text-primary" />
          Статистика
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Route" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Поездок</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalRides}</p>
          </div>
          
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Километров</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalKm.toLocaleString()}</p>
          </div>
          
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Gauge" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Средняя скорость</span>
            </div>
            <p className="text-2xl font-bold">{stats.avgSpeed} <span className="text-sm">км/ч</span></p>
          </div>
          
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Макс. скорость</span>
            </div>
            <p className="text-2xl font-bold">{stats.topSpeed} <span className="text-sm">км/ч</span></p>
          </div>
          
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Moon" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Ночных</span>
            </div>
            <p className="text-2xl font-bold">{stats.nightRides}</p>
          </div>
          
          <div className="p-3 bg-background/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Групповых</span>
            </div>
            <p className="text-2xl font-bold">{stats.groupRides}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold flex items-center gap-2">
          <Icon name="Trophy" size={18} className="text-primary" />
          Достижения ({achievements.filter(a => a.unlocked).length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-3 rounded flex items-center justify-center aspect-square ${
                achievement.unlocked
                  ? 'bg-primary/20 brutal-shadow cursor-pointer hover:bg-primary/30 transition-colors'
                  : 'bg-background/30 opacity-40'
              }`}
              title={achievement.unlocked ? achievement.description : '???'}
            >
              <span className="text-2xl">{achievement.unlocked ? achievement.icon : '🔒'}</span>
              {achievement.unlocked && (
                <div className="absolute top-1 right-1">
                  <Icon name="Check" size={12} className="text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
