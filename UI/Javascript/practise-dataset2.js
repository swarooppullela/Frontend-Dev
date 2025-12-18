import * as data from '../../JsonData/practiseDataset.json' assert { type: 'json' };

// Extract all active users with enrolled course titles

const activeUsersWithCourses = data?.users
  .filter(user => user?.role === 'student' && user?.isActive)
  .map(user => ({
    name: user?.name,
    courses: data?.courses?.filter(course => user?.enrolledCourseIds?.includes(course?.id)).map(course => course?.title)
  }));

console.log("Active users with courses: ", activeUsersWithCourses);

// Calculate total revenue from successful orders

const totalRevenue = data?.orders
  ?.filter(order => order.payment.status === 'success')
  .reduce((total, order) => {
    const orderTotal = order?.items.reduce((sum, item) => sum + item.pricePaid, 0);
    return total + orderTotal;
  }, 0);

console.log("Total revenue from successful orders: ", totalRevenue);