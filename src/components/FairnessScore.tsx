import { ArrowDown, TrendingUp, AlertCircle } from 'lucide-react';
import { Roommate, FairnessScore as FairnessScoreType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface FairnessScoreProps {
  roommates: Roommate[];
  scores: FairnessScoreType[];
}

export function FairnessScore({ roommates, scores }: FairnessScoreProps) {
  const getRoommateName = (id: string) => {
    return roommates.find((r) => r.id === id)?.name || 'Unknown';
  };

  // Sort scores from lowest to highest
  const sortedScores = [...scores].sort((a, b) => a.score - b.score);
  const lowestScore = sortedScores[0];
  const maxScore = Math.max(...scores.map((s) => s.score));

  const getScoreColor = (score: number) => {
    if (score < 55) return 'text-red-600';
    if (score < 65) return 'text-orange-500';
    return 'text-green-600';
  };

  const getProgressColor = (score: number) => {
    if (score < 55) return 'bg-red-500';
    if (score < 65) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getScoreLabel = (score: number, isLowest: boolean) => {
    if (isLowest && score < 60) return 'Needs more tasks';
    if (score < 55) return 'Low contribution';
    if (score < 65) return 'Fair contribution';
    return 'Great contribution';
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-full">
      <div className="max-w-2xl mx-auto p-6 pb-24 pt-14">
        <h1 className="mb-8 text-center text-blue-900">Fairness Score</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contribution Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedScores.map((score) => {
                const isLowest = score.roommateId === lowestScore.roommateId;
                return (
                  <div
                    key={score.roommateId}
                    className={`p-4 rounded-lg transition-all ${
                      isLowest ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {getRoommateName(score.roommateId)}
                        </span>
                        {isLowest && score.score < 60 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
                            <ArrowDown className="w-3 h-3 text-red-600" />
                            <span className="text-xs text-red-700">Lowest</span>
                          </div>
                        )}
                      </div>
                      <span className={`${getScoreColor(score.score)}`}>
                        {score.score}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <Progress 
                        value={(score.score / maxScore) * 100}
                        className="h-3"
                      />
                      <style>{`
                        [data-score="${score.score}"] > div {
                          ${score.score < 55 ? 'background-color: rgb(239 68 68);' : ''}
                          ${score.score >= 55 && score.score < 65 ? 'background-color: rgb(249 115 22);' : ''}
                          ${score.score >= 65 ? 'background-color: rgb(34 197 94);' : ''}
                        }
                      `}</style>
                      <div data-score={score.score} className="absolute inset-0 -z-10">
                        <Progress 
                          value={(score.score / maxScore) * 100}
                          className="h-3"
                        />
                      </div>
                    </div>
                    
                    <p className={`text-sm mt-2 ${getScoreColor(score.score)}`}>
                      {getScoreLabel(score.score, isLowest)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 mb-1">How it works</p>
                  <p className="text-sm text-gray-700">
                    Fairness scores are calculated based on completed chores, meals cooked, and shared expenses. Higher scores indicate more contributions to the household.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual representation */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-around h-56 px-4">
              {sortedScores.map((score) => {
                const height = (score.score / maxScore) * 100;
                const isLowest = score.roommateId === lowestScore.roommateId;
                return (
                  <div
                    key={score.roommateId}
                    className="flex flex-col items-center gap-3 flex-1 max-w-[100px]"
                  >
                    <div className="relative w-full flex justify-center">
                      {isLowest && score.score < 60 && (
                        <div className="absolute -top-6 animate-bounce">
                          <ArrowDown className="w-5 h-5 text-red-600" />
                        </div>
                      )}
                      <div
                        className={`w-16 rounded-t-lg transition-all ${
                          score.score < 55
                            ? 'bg-red-500'
                            : score.score < 65
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-900">
                        {getRoommateName(score.roommateId)}
                      </p>
                      <p className={`text-xs ${getScoreColor(score.score)}`}>
                        {score.score}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}