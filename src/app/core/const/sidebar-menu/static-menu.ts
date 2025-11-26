export const staticSidebarMenu: any = {
  statusCode: 201,
  success: true,
  data: {
    employeeDetails: {
      firstName: 'Admin',
      lastName: 'Panel',
      displayName: 'panel',
    },
    accessToken: '',
    role: {
      name: 'Admin',
      modules: [
        {
          title: 'User',
          actions: [],
          siblings: [
            {
              title: 'User',
              description: null,
              actions: [
                {
                  name: 'Add',
                  type: 'BUTTON',
                  permission: true,
                },
                {
                  name: 'View',
                  type: 'LISTING_ACTION',
                  permission: true,
                },
                {
                  name: 'Update',
                  type: 'LISTING_ACTION',
                  permission: true,
                },
              ],
              siblings: [],
              permission: true,
            },
          ],
          permission: true,
        },
        {
          title: 'Affirmations',
          actions: [],
          siblings: [
            {
              title: 'Affirmations',
              description: null,
              actions: [
                {
                  name: 'Add',
                  type: 'BUTTON',
                  permission: true,
                },
                {
                  name: 'View',
                  type: 'LISTING_ACTION',
                  permission: true,
                },
                {
                  name: 'Update',
                  type: 'LISTING_ACTION',
                  permission: true,
                },
              ],
              siblings: [],
              permission: true,
            },
          ],
          permission: true,
        },
        {
          title: 'Master Data',
          actions: [],
          siblings: [],
          permission: false,
        },
      ],
    },
  },
};
