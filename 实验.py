# 162. 寻找峰值
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = l + (r - l) // 2
            if nums[mid] < nums[mid + 1]:
                l = mid + 1
            else:
                r = mid
        return l


# 153. 寻找旋转排序数组中的最小值
class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = l + (r - l) // 2
            if nums[mid] > nums[r]:
                l = mid + 1
            else:
                r = mid
        return nums[l]


# 69. x 的平方根

class Solution:
    def mySqrt(self, x: int) -> int:
        l, r, ans = 0, x, -1
        while l <= r:
            mid = l + (r - l) // 2
            if mid * mid <= x:
                ans = mid
                l = mid + 1
            else:
                r = mid - 1
        return ans


# public
# static
# int
# binarySearch(int[]
# nums, int
# target, int
# left, int
# right) {
#
# if (left <= right)
# {
#     int
# mid = left + ((right - left) >> 1);
# if (nums[mid] == target)
# {
# // 查找成功
# return mid;
# } else if (nums[mid] > target) {
# // 新的区间, 左半区间
# return binarySearch(nums, target, left, mid - 1);
# } else if (nums[mid] < target) {
# // 新的区间，右半区间
# return binarySearch(nums, target, mid + 1, right);
# }
# }
# // 不存在返回 - 1
# return -1;
# }

# 二分法求平方根

from math import sqrt


def check_precision(l, h, p, len1):  # 检查是否达到了精确位
    l = str(l)
    h = str(h)
    if len(l) <= len1 + p or len(h) <= len1 + p:
        return False
    for i in range(len1, p + len1):  # 检查小数点后面的p个数是否相等
        if l[i] != h[i]:  # 当l和h某一位不相等时，说明没有达到精确位
            return False
    return True


def print_result(x, len1, p):
    x = str(x)
    if len(x) - len1 < p:  # 没有达到要求的精度就已经找出根
        s = x[:len1] + "." + x[len1:] + '0' * (p - len(x) + len1)
    else:
        s = x[:len1] + "." + x[len1:len1 + p]
    print(s)


def binary_sqrt(x, p):
    new = int(sqrt(x))
    if new * new == x:  # 完全平方数直接开方，不用继续进行
        print_result(new, len(str(new)), p)
        return
    len1 = len(str(new))  # 找出整数部分的长度
    l = 0
    h = x
    while (not check_precision(l, h, p, len1)):  # 没有达到精确位，继续循环
        if not l == 0:  # 第一次l=0，h=x时不用乘以10，直接取中间值
            h = h * 10  # l,h每次扩大10倍
            l = l * 10
            x = x * 100  # x每次要扩大100倍，因为平方
        m = l + (h - l) // 2
        if m * m == x:
            return print_result(m, len1, p)
        elif m * m > x:
            h = m
        else:
            l = m
    return print_result(l, len1, p)  # 当达到了要求的精度，直接返回l


while True:
    x = int(input("请输入待开方数："))
    p = int(input("请输入精度："))
    print("binary_sqrt:", end="")
    binary_sqrt(x, p)

# 原作者：※夏日星空※
# 原贴地址：https://blog.csdn.net/qq_34681949/article/details/83513371?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162133021716780262588545%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162133021716780262588545&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-22-83513371.first_rank_v2_pc_rank_v29&utm_term=%E4%BA%8C%E5%88%86%E6%B3%95%E6%B1%82%E5%B9%B3%E6%96%B9%E6%A0%B9python&spm=1018.2226.3001.4449
