import { PhoneDetail } from '../models';
import { Phone } from '../models/Phone';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export type OrderBy =
  | 'newest'
  | 'ram'
  | 'category'
  | 'name'
  | 'price'
  | 'screen'
  | 'capacity'
  | 'color'
  | 'year';
export type SortOrder = 'ASC' | 'DESC';
export type ProductType = 'phones';

const getAll = async () => {
  const phones = await Phone.findAll();
  return phones;
};

const getAllPhones = async (
  page: number,
  perPage: number,
  orderBy?: OrderBy,
  sort?: SortOrder,
  productType?: ProductType,
  searchText?: string
) => {
  const offset = (page - 1) * perPage;
  let order: [[OrderBy, SortOrder]] | [['id', 'ASC']];

  const searchKeywords = searchText?.split(' ');

  const searchConditions = searchKeywords?.map((keyword) => ({
    name: {
      [Op.iLike]: `%${keyword}%`,
    },
  }));

  if (productType !== 'phones' && productType) {
    return [];
  }

  if (orderBy && isOrderBy(orderBy)) {
    if (sort !== 'DESC') {
      order = [[orderBy, 'ASC']];
    } else {
      order = [[orderBy, 'DESC']];
    }
  } else {
    order = [['id', 'ASC']];
  }

  if (searchConditions && searchConditions?.length > 0) {
    const { count, rows } = await Phone.findAndCountAll({
      where: {
        [Op.and]: searchConditions,
      },
      offset: offset || 0,
      limit: perPage || 8,
      order,
    });

    return { count, rows };
  }

  const { count, rows } = await Phone.findAndCountAll({
    offset: offset || 0,
    limit: perPage || 8,
    order,
  });

  return { count, rows };
};

function isOrderBy(value: string): value is OrderBy {
  const validOrderBys: OrderBy[] = [
    'ram',
    'category',
    'name',
    'price',
    'screen',
    'capacity',
    'color',
    'year',
  ];
  return validOrderBys.includes(value as OrderBy);
}

const getPhone = async (id: string) => {
  const phone = await PhoneDetail.findOne({
    where: {
      id,
    },
  });
  return phone;
};

const getPhonesRecommended = async (id: string) => {
  const phone = await getPhone(id);
  if (!phone) {
    return;
  }

  const { color } = phone;

  const phonesRecommended = await Phone.findAll({
    where: {
      color: {
        [Op.like]: color,
      },
    },
  });

  return phonesRecommended;
};

const getNewPhones = async () => {
  const phonesNew = await Phone.findAll({
    order: [['year', 'DESC']],
    limit: 7,
  });
  return phonesNew;
};

const getDiscount = async () => {
  const discount = await Phone.findAll({
    attributes: [
      'price',
      'fullPrice',
      'category',
      'phoneId',
      'itemId',
      'name',
      'screen',
      'capacity',
      'color',
      'ram',
      'year',
      'image',
      [Sequelize.literal('"fullPrice" - "price"'), 'result'],
    ],
    order: [[Sequelize.literal('"result"'), 'DESC']],
    limit: 10,
  });

  if (!discount) {
    return [];
  }

  return discount;
};

export const apiServices = {
  getAll,
  getAllPhones,
  getPhone,
  getPhonesRecommended,
  getNewPhones,
  getDiscount,
  // getNum
};
