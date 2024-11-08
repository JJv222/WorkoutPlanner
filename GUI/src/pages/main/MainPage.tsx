import React from "react";
import { Carousel, Button, Card } from "flowbite-react";

const MainPage: React.FC = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Welcome to Your Fitness Tracker
        </h1>
        <p className="text-lg text-gray-400">
          Track your workouts, monitor your weight, and organize your exercises.
        </p>
      </div>

      <div className="h-80 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={2000} pauseOnHover>
          <img src="images/healthy.jpg" alt="..." />
          <img src="images/fitness.jpg" alt="..." />
          <img src="images/running.jpg" alt="..." />
          <img src="images/gym.jpg" alt="..." />
        </Carousel>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        <Card className="rounded-lg bg-blue-600 text-white shadow-lg">
          <h2 className="mb-2 text-2xl font-semibold">Trenings</h2>
          <p>Plan, track, and optimize your workouts.</p>
          <Button href="/trenings" color="light" className="mt-4">
            Go to Trenings
          </Button>
        </Card>

        <Card className="rounded-lg bg-green-600 text-white shadow-lg">
          <h2 className="mb-2 text-2xl font-semibold">Weights</h2>
          <p>Record and monitor your weight progress.</p>
          <Button href="/weights" color="light" className="mt-4">
            Go to Weights
          </Button>
        </Card>

        <Card className="rounded-lg bg-yellow-600 text-white shadow-lg">
          <h2 className="mb-2 text-2xl font-semibold">Exercises</h2>
          <p>Explore and organize your exercises.</p>
          <Button href="/exercises" color="light" className="mt-4">
            Go to Exercises
          </Button>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <blockquote className="text-xl font-semibold italic text-gray-400">
          "The only bad workout is the one you didn’t do."
        </blockquote>
        <p className="mt-2 text-sm text-gray-500">
          Stay consistent and keep pushing forward.
        </p>
      </div>
    </div>
  );
};

export default MainPage;
