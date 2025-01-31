const HotelSkeleton = () => (
  <div className="p-4 border rounded-lg mb-4">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-2/5"></div>
      </div>
    </div>
  </div>
);

const PlaceVisitSkeleton = () => (
  <div className="animate-pulse p-4 border-b">
    <div className="flex gap-4">
      <div className="w-24 h-24 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

const DaySkeleton = () => (
  <div className="mb-8">
    <div className="animate-pulse mb-4">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <PlaceVisitSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const TripSkeleton = ({ days = 3 }: { days?: number }) => (
  <div className="max-w-4xl mx-auto p-4">
    {/* Header Skeleton */}
    <div className="animate-pulse mb-8 space-y-2">
      <div className="h-[250px] w-full bg-gray-200 rounded-xl mb-4"></div>
    </div>

    {/* Hotel Section */}
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
      {[...Array(3)].map((_, i) => (
        <HotelSkeleton key={i} />
      ))}
    </div>

    {/* Itinerary */}
    <div className="mb-8">
      <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
      {[...Array(days)].map((_, i) => (
        <DaySkeleton key={i} />
      ))}
    </div>
  </div>
);
