import { format, subDays } from 'date-fns';

export const DeliveryStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  APPROVED: 'APPROVED',
};

const generateDeliveryMetrics = () => {
  const metrics = [];
  const today = new Date();
  const deliveryCenterIds = ['del-1', 'del-2', 'del-3', 'del-4'];

  deliveryCenterIds.forEach((dcId) => {
    for (let i = 0; i < 15; i++) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const isToday = i === 0;

      const articlesIssued = 1000 + Math.floor(Math.random() * 400);
      const deliveryRate = 0.94 + Math.random() * 0.05; // 94-99%
      const articlesDelivered = Math.floor(articlesIssued * deliveryRate);

      metrics.push({
        id: `delivery-${dcId}-${dateStr}`,
        officeId: dcId,
        date: dateStr,
        submittedBy: getUserForDC(dcId),
        submittedAt: isToday ? null : `${dateStr}T09:30:00Z`,
        status: isToday ? DeliveryStatus.DRAFT : DeliveryStatus.APPROVED,

        delivery: {
          articlesIssuedToBeats: articlesIssued,
          articlesDelivered: articlesDelivered,
          undelivered: articlesIssued - articlesDelivered,
          deliveryRate: parseFloat((deliveryRate * 100).toFixed(2)),
        },

        remarks: deliveryRate < 0.95 ? 'Heavy rain delayed deliveries' : null,

        createdAt: `${dateStr}T08:00:00Z`,
        updatedAt: isToday ? `${dateStr}T09:00:00Z` : `${dateStr}T09:30:00Z`,
      });
    }
  });

  return metrics;
};

const getUserForDC = (dcId) => {
  const mapping = {
    'del-1': 'user-8',
    'del-2': 'user-9',
  };
  return mapping[dcId] || 'user-8';
};

export const deliveryMetrics = generateDeliveryMetrics();

export const getDeliveryMetricsByOffice = (officeId) =>
  deliveryMetrics.filter((m) => m.officeId === officeId);

export const getDeliveryMetricsByDate = (date) =>
  deliveryMetrics.filter((m) => m.date === date);
